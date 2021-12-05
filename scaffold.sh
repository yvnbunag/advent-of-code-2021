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

targetID="day-$day"
targetInput="$inputsDirectory/$targetID.txt"
targetPuzzle="$puzzleDirectory/$targetID.ts"
targetSpec="$specsDirectory/$targetID.spec.ts"

if [[ -f $targetInput ]] && [[ -f $targetPuzzle ]] && [[ -f $targetSpec ]]
  then
    echo "Scaffold files for day $day existing"
    exit 1
fi

cp -n "$inputsDirectory/template.txt" $targetInput
scaffolded $targetInput

cp -n "$puzzleDirectory/template.ts" $targetPuzzle
scaffolded $targetPuzzle

cp -n "$specsDirectory/template.spec.ts" $targetSpec
sed -i '' "s/template/$targetID/" $targetSpec
scaffolded $targetSpec
