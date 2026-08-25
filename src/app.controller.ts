import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

export interface PostCreatedEvent {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface UserFollowedEvent {
  followerId: string;
  followingId: string;
  createdAt: string;
}

@Controller()
export class AppController {
  @EventPattern('post.created')
  handlePostCreated(
    @Payload() post: PostCreatedEvent,
    @Ctx() context: KafkaContext,
  ) {
    console.log('Post notification:', {
      post,
      partition: context.getPartition(),
    });
  }

  @EventPattern('user.followed')
  handleUserFollowed(
    @Payload() event: UserFollowedEvent,
    @Ctx() context: KafkaContext,
  ) {
    console.log('Follow notification:', {
      message: `${event.followerId} followed ${event.followingId}`,
      partition: context.getPartition(),
    });
  }
}
