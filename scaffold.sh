#!/bin/sh
day=$1
inputsDirectory='src/inputs'
puzzleDirectory='src/puzzle'
specsDirectory='test/specs/puzzle'

function scaffolded {
  echo "scaffolded $1"
}

if [ -z "$day" ]
  then
    echo "Day (number) argument required"
    exit 1
fi

targetInput="$inputsDirectory/day-$day.txt"
targetPuzzle="$puzzleDirectory/day-$day.ts"
targetSpec="$specsDirectory/day-$day.spec.ts"

# @TODO prevent if files already exist
cp -n "$inputsDirectory/template.txt" $targetInput
scaffolded $targetInput
cp -n "$puzzleDirectory/template.ts" $targetPuzzle
scaffolded $targetPuzzle
cp -n "$specsDirectory/template.spec.ts" $targetSpec
scaffolded $targetSpec
