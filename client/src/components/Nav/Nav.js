import React from 'react';
import "./Nav.css"
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="navbar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="/home" hidefocus="hidefocus">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="about Us" hidefocus="hidefocus">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="programs" hidefocus="hidefocus">Programs</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/" hidefocus="hidefocus">Courses</a>
          </li>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Dropdown
              </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ul>
      </div>
    );
  }
}

export default NavBar;
