import 'rc-time-picker/assets/index.css';

import React,{useState} from 'react';
import ReactDom from 'react-dom';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

function EndTime(props) {
    // const [endDate, setEndDate] = useState(new Date());
  const format2 = 'h:mm a';

const now1 = moment().hour(0).minute(0);

  function onChange(value) {
    console.log("TESTTEST",value && value);
    props.setEndDate(value.format2())
  }

  return (
    <TimePicker
    showSecond={false}
    defaultValue={now1}
    onChange={onChange}
    format={format2}
    use12Hours
    inputReadOnly
  />
  );
}

export default EndTime;
