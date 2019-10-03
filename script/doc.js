
import {writeFileSync} from 'fs';
import {typeDefs} from '../src/schema';

writeFileSync('./documentation.txt', typeDefs);
