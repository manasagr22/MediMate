import logo from './logo.svg';
import './App.css';
import {
  Input, Select, Option, Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";

function App() {
  return (
    <div className="App">
      <div>
        <Input type="password" className="inputClass" label="Password" />
      </div>
    </div>
  );
}

export default App;
