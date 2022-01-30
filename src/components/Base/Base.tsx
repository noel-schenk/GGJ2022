import React, { FC, useState } from 'react';
import { GameServer } from '../../classes/GameServer';
import { Views } from '../../classes/Interfaces';
import GameView from '../GameView/GameView';
import Lobby from '../Lobby/Lobby';

interface BaseProps {}

const Base: FC<BaseProps> = () => {
  const [view, setView] = useState<Views>();

  GameServer.Instance.room.onStateChange(() => {
    setView(GameServer.Instance.room.state.view);
  });

  switch (GameServer.Instance.room.state.view) {
    case Views.Game:
      return <GameView />;
    case Views.Lobby:
      return <Lobby />;
    default:
      return <>Error please reload Game</>;
  }
};

export default Base;
