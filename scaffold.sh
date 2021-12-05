#!/bin/sh
day=$1
inputsDirectory='src/inputs'
puzzleDirectory='src/puzzle'
specsDirectory='test/specs/puzzle'

if [ -z "$day" ]
  then
    echo "Day (number) argument required"
    exit 1
fi

cp -n "$inputsDirectory/template.txt" "$inputsDirectory/day-$day.txt"
cp -n "$puzzleDirectory/template.ts" "$puzzleDirectory/day-$day.ts"
cp -n "$specsDirectory/template.spec.ts" "$specsDirectory/day-$day.spec.ts"
