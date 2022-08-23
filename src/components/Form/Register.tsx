import React, { useState } from 'react'
import axios from 'axios';
import { Form } from './Form';

export default function Register () {
  const [register, setRegister] = useState(() => {
    return {
        username: "",
        email: "",
        password: "",
    }
  });

  return (<Form />);
}

