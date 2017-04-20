#!/bin/bash

OPT=$1

SSH="sshpass -proot ssh root@hammerhead"

if [ "x" == "x${OPT}" ]; then
  exit
fi

case ${OPT} in
  "0" )
#    $SSH 'input keyevent KEYCODE_POWER' >/dev/null
    $SSH 'am start com.pas.webcam/.Rolling' >/dev/null
    ;;
  "1" )
    $SSH 'am force-stop com.pas.webcam' >/dev/null
    ;;
  * )
    ;;
esac

exit
