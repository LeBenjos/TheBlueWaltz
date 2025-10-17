import './experiences/styles/style.scss';

import InitCommand from './experiences/commands/InitCommand';
import Experience from './experiences/Experience';
import Ticker from './experiences/tools/Ticker';

//#region Commands
//
InitCommand.Begin();
//
//#endregion

Experience.Init();
const experience = new Experience();
Ticker.Add(experience);
