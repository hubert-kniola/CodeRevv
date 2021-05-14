import { FC } from 'react';
import { MessageOverlay } from 'components';

export const UserFeed: FC = () => {
  return (
    <MessageOverlay active={true} title="Ups..." text="Ciągle pracujemy nad panelem głównym!">
      <div style={{ height: '100vh' }} />
    </MessageOverlay>
  );
};
