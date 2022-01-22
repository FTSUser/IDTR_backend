import 'rc-time-picker/assets/index.css';

import React,{useState} from 'react';
import ReactDom from 'react-dom';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

function TimeSelect(props) {
  const [startDate, setStartDate] = useState(new Date());
  const format = 'h:mm a';

const now = moment().hour(0).minute(0);

  function onChange(value) {
    console.log("TESTTEST",value && value.format());
    props.setStartDate(value.format())
  }

  return (
    <TimePicker
    showSecond={false}
    defaultValue={now}
    onChange={onChange}
    format={format}
    use12Hours
    inputReadOnly
  />
  );
}

export default TimeSelect;
