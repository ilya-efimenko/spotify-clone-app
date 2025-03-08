import { Component, ElementRef, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragMove, DragDropModule, Point } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-player-progress',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './player-progress.component.html',
})
export class PlayerProgressComponent implements OnChanges {
  @ViewChild('progressContainer')
  set progressContainer(value: ElementRef<HTMLDivElement>) {
    this.maxOffsetX = value.nativeElement.offsetWidth;
  }

  private _progressMs = 0;
  private _dragPosition = { x: 0, y: 0 };

  get progressMs(): number {
    return this._progressMs;
  }

  set progressMs(value: number) {
    this._progressMs = value;
  }

  get dragPosition(): Point {
    return this._dragPosition;
  }

  set dragPosition(value: Point) {
    this._dragPosition = value;
  }

  progress = input<{ progressMs: number; durationMs: number }>();

  isMoving = false;
  isDragEnd = false;

  private positionX = 0;
  private maxOffsetX = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['progress']) {
      if (changes['progress'].currentValue.durationMs > 0) {
        const { progressMs = 0, durationMs = 0 } = this.progress() || {};

        this.dragPosition = {
          x: Math.min((progressMs / durationMs) * this.maxOffsetX, this.maxOffsetX),
          y: 0,
        };

        this.progressMs = progressMs;
        this.positionX = this.dragPosition.x;
      }
    }
  }

  onDragMove(event: CdkDragMove): void {
    this.isMoving = true;
    this.isDragEnd = false;

    const positionX = this.positionX > 0 ? this.positionX + event.distance.x : event.distance.x;
    this.dragPosition = { x: positionX, y: 0 };

    this.progressMs = this.toProgressMs();
  }

  onDragEnd(): void {
    this.isMoving = false;
    this.isDragEnd = true;

    this.positionX = this.dragPosition.x;
  }

  onProgressLineClick(event: MouseEvent | Event): void {
    if (this.isDragEnd) {
      this.isDragEnd = false;
      return;
    }

    if (event instanceof MouseEvent) {
      this.dragPosition = { x: event.offsetX, y: 0 };
      this.positionX = this.dragPosition.x;
      this.progressMs = this.toProgressMs();
    }
  }

  private toProgressMs(): number {
    return Math.min(
      (this.dragPosition.x / this.maxOffsetX) * (this.progress()?.durationMs ?? 0),
      this.progress()?.durationMs ?? 0
    );
  }
}
