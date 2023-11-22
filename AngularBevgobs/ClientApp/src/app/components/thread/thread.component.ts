import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/Models/Thread';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  threads: Thread[] = [];
  selectedThread: Thread | null = null;

  constructor(private threadService: ThreadService) {}

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(): void {
    this.threadService.getAllThreads().subscribe((threads: Thread[]) => (this.threads = threads));
  }


  viewDetails(threadId: number): void {
    this.threadService.getThreadById(threadId).subscribe((thread) => (this.selectedThread = thread));
  }

  createThread(thread: Thread): void {
    this.threadService.createThread(thread).subscribe((newThread) => {
      this.threads.push(newThread);
    });
  }

  updateThread(thread: Thread): void {
    this.threadService.updateThread(thread).subscribe((updatedThread) => {
    });
  }

  deleteThread(threadId: number): void {
    this.threadService.deleteThread(threadId).subscribe(() => {
      this.threads = this.threads.filter((thread) => thread.threadId !== threadId);
    });
  }
}
