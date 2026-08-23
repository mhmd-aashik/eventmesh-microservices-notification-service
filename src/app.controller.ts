import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

export interface PostCreatedEvent {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

@Controller()
export class AppController {
  @EventPattern('post.created')
  handlePostCreated(@Payload() post: PostCreatedEvent) {
    console.log('Notification Service received:');
    console.log(post);

    console.log(
      `Notification created for post ${post.id} by user ${post.userId}`,
    );
  }
}
