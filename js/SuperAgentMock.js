/**
 * Created by michal on 15.06.16.
 */

"use strict"

import superagent from 'superagent';
import {mock} from 'mocktail';

console.log("originaller request" + superagent.name)
console.log("mocked" + mock(superagent).name)



export default mock(superagent)