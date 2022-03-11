import {Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  return <div>
    <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
        <InputGroup className="form-control-send">
            <FormControl type="user" placeholder="message..."
                onChange={e => setMessage(e.target.value)} value={message} />
            {/* <InputGroup.Append> */}
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={!message}
                    className="send-button">Send</Button>
            {/* </InputGroup.Append> */}
        </InputGroup>
    </Form>
  </div>
}

export default SendMessageForm;