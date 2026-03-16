import { Component, signal, computed, viewChildren, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.template.html',
  styleUrls: ['./presentation.styles.css']
})
export class PresentationComponent implements AfterViewInit, OnDestroy {
  private readonly slides = viewChildren<ElementRef<HTMLElement>>('slide');
  private readonly currentSlideIndex = signal<number>(0);
  private scrollTimeout: ReturnType<typeof setTimeout> | undefined;
  private animationFrame: number | null = null;
  private readonly scrollDebounceMs = 800;
  private readonly minScrollDelta = 50;
  private readonly animationDuration = 600;
  private touchStartY = 0;
  private wheelHandler: ((event: WheelEvent) => void) | null = null;
  private keyDownHandler: ((event: KeyboardEvent) => void) | null = null;
  private touchStartHandler: ((event: TouchEvent) => void) | null = null;
  private touchEndHandler: ((event: TouchEvent) => void) | null = null;
  private hashChangeHandler: ((event: HashChangeEvent) => void) | null = null;

  public readonly totalSlides = 4;
  public readonly slideIndices = Array.from({ length: this.totalSlides }, (_, i) => i);

  public readonly isScrolling = signal<boolean>(false);
  public readonly activeSlideIndex = computed(() => this.currentSlideIndex());
  public readonly isAnimating = signal<boolean>(false);

  public ngAfterViewInit(): void {
    document.body.style.overflow = 'hidden';
    this.setupEventListeners();
    this.checkInitialHash();
  }

  public ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
    this.cleanupEventListeners();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  public goToSlide(index: number, updateHash = true): void {
    const slidesArray = this.slides();
    if (index < 0 || index >= slidesArray.length || index === this.currentSlideIndex() || this.isAnimating()) {
      return;
    }

    this.isAnimating.set(true);
    this.currentSlideIndex.set(index);

    const targetSlide = slidesArray[index].nativeElement;
    this.smoothScrollTo(targetSlide.offsetTop);

    if (updateHash) {
      window.location.hash = `slide-${index + 1}`;
    }

    this.resetScrollTimeout();
  }

  public goToNextSlide(): void {
    if (this.currentSlideIndex() < this.slides().length - 1) {
      this.goToSlide(this.currentSlideIndex() + 1);
    }
  }

  public goToPreviousSlide(): void {
    if (this.currentSlideIndex() > 0) {
      this.goToSlide(this.currentSlideIndex() - 1);
    }
  }

  public onDotClick(index: number): void {
    if (!this.isScrolling() && !this.isAnimating()) {
      this.goToSlide(index);
    }
  }

  private smoothScrollTo(targetPosition: number): void {
    const container = document.querySelector('.presentation-container') as HTMLElement;
    if (!container) return;

    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);

      const easeProgress = this.easeInOutCubic(progress);
      container.scrollTop = startPosition + (distance * easeProgress);

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animateScroll);
      } else {
        this.isAnimating.set(false);
        this.animationFrame = null;
      }
    };

    this.animationFrame = requestAnimationFrame(animateScroll);
  }

  private easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  private setupEventListeners(): void {
    this.wheelHandler = this.handleWheel.bind(this);
    window.addEventListener('wheel', this.wheelHandler, { passive: false });

    this.keyDownHandler = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.keyDownHandler);

    this.touchStartHandler = this.handleTouchStart.bind(this);
    window.addEventListener('touchstart', this.touchStartHandler);

    this.touchEndHandler = this.handleTouchEnd.bind(this);
    window.addEventListener('touchend', this.touchEndHandler);

    this.hashChangeHandler = this.handleHashChange.bind(this);
    window.addEventListener('hashchange', this.hashChangeHandler);
  }

  private cleanupEventListeners(): void {
    if (this.wheelHandler) window.removeEventListener('wheel', this.wheelHandler);
    if (this.keyDownHandler) window.removeEventListener('keydown', this.keyDownHandler);
    if (this.touchStartHandler) window.removeEventListener('touchstart', this.touchStartHandler);
    if (this.touchEndHandler) window.removeEventListener('touchend', this.touchEndHandler);
    if (this.hashChangeHandler) window.removeEventListener('hashchange', this.hashChangeHandler);
  }

  private handleWheel(event: WheelEvent): void {
    event.preventDefault();

    if (this.isScrolling() || this.isAnimating()) {
      return;
    }

    const delta = event.deltaY;

    if (Math.abs(delta) < this.minScrollDelta) {
      return;
    }

    this.isScrolling.set(true);

    if (delta > 0) {
      this.goToNextSlide();
    } else {
      this.goToPreviousSlide();
    }

    this.resetScrollTimeout();
  }

  private handleTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
  }

  private handleTouchEnd(event: TouchEvent): void {
    if (this.isScrolling() || this.isAnimating() || !this.touchStartY) {
      return;
    }

    const touchEndY = event.changedTouches[0].clientY;
    const delta = this.touchStartY - touchEndY;

    if (Math.abs(delta) < this.minScrollDelta) {
      return;
    }

    this.isScrolling.set(true);

    if (delta > 0) {
      this.goToNextSlide();
    } else {
      this.goToPreviousSlide();
    }

    this.resetScrollTimeout();
    this.touchStartY = 0;
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.isScrolling() || this.isAnimating()) {
      return;
    }

    const keyActions: Record<string, () => void> = {
      'ArrowDown': () => this.goToNextSlide(),
      'ArrowRight': () => this.goToNextSlide(),
      'PageDown': () => this.goToNextSlide(),
      ' ': () => this.goToNextSlide(),
      'ArrowUp': () => this.goToPreviousSlide(),
      'ArrowLeft': () => this.goToPreviousSlide(),
      'PageUp': () => this.goToPreviousSlide(),
      'Home': () => this.goToSlide(0),
      'End': () => this.goToSlide(this.slides().length - 1),
      'F11': () => this.toggleFullscreen()
    };

    const action = keyActions[event.key];
    if (action) {
      event.preventDefault();
      this.isScrolling.set(true);
      action();
      setTimeout(() => this.isScrolling.set(false), 500);
    }
  }

  private handleHashChange(): void {
    const hash = window.location.hash.substring(1);
    const slideMatch = hash.match(/^slide-(\d+)$/);

    if (slideMatch) {
      const index = parseInt(slideMatch[1], 10) - 1;
      if (index >= 0 && index < this.slides().length) {
        this.goToSlide(index, false);
      }
    }
  }

  private checkInitialHash(): void {
    setTimeout(() => {
      this.handleHashChange();
    });
  }

  private resetScrollTimeout(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.isScrolling.set(false);
    }, this.scrollDebounceMs);
  }

  private toggleFullscreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}
