import React, { FC, useState } from 'react';
import { GameServer } from '../../classes/GameServer';
import { useBehaviorSubject } from '../../classes/Helper';
import { Views } from '../../classes/Interfaces';
import GameView from '../GameView/GameView';
import Lobby from '../Lobby/Lobby';

interface BaseProps {}

const Base: FC<BaseProps> = () => {
  const roomState = useBehaviorSubject(GameServer.Instance.roomState);

  console.log(roomState?.view, 'room?.state.view');
  switch (roomState?.view) {
    case Views.Game:
      return <GameView />;
    case Views.Lobby:
      return <Lobby />;
    default:
      return <div>Error please reload Game</div>;
  }
};

export default Base;
