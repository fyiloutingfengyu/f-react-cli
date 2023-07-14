#! /usr/bin/env node
import { program } from 'commander';
import init from '../src/commands/init.js';

program.version('1.0.0');
init(program);
program.parse(process.ragv);

