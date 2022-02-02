import React, { FC, useEffect, useState } from 'react';
import styles from './Joystick.module.scss';
import nipplejs from 'nipplejs';
import { GameEvents } from '../../classes/GameEvents';
import { Direction } from '../../classes/Interfaces';

interface JoystickProps {}

const Joystick: FC<JoystickProps> = () => {
  const joystickRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (!joystickRef.current) return;

    let degree = 0,
      angle = 'up';

    const joystick = nipplejs.create({
      zone: joystickRef.current,
      color: '#8eecf5ff',
      size: 200,
    });

    const sendJoystick = () => angle && degree && GameEvents.onMove(angle as any, degree);

    const onJoystick = (ev: nipplejs.EventData, data: nipplejs.JoystickOutputData) => {
      degree = data.angle?.degree;
      angle = data.direction?.angle;
      sendJoystick();
    };

    joystick.on('start', onJoystick);
    joystick.on('end', onJoystick);
    joystick.on('move', onJoystick);

    setInterval(() => {
      sendJoystick();
    }, 200);
  }, []);

  return <div className={styles.Joystick} ref={joystickRef}></div>;
};

export default Joystick;
