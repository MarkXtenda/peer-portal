import React from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { settingsToggleStateSelector, settingsTogleSelector } from '../features/settings/SettingsSelector';
import Settings from './side-windows/Settings';
import CreateChannel from './side-windows/CreateChannel';
import { toggleVariants } from '../features/animationVariants';
import { settingsTogleAction } from '../features/settings/SettingsSlice';

function MenuOptions() {
    const toggleState = useSelector(settingsToggleStateSelector);
    const toggle = useSelector(settingsTogleSelector)
    const dispatch = useDispatch()

  return (
    <motion.div
        key={toggleState}
        className="toggle-content"
        initial="hidden"
        animate={toggleState ? 'visible' : 'closed'}
        variants={toggleVariants}>
          {toggle === 'createChannel' && <CreateChannel />}
          {toggle === 'settings' && <Settings />}
          {toggle === 'nightMode' && <div onClick={()=>dispatch(settingsTogleAction("nightMode"))} >Night Mode</div>}
    </motion.div>
  )
}
export default MenuOptions