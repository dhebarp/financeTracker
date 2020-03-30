import React from 'react';
import { Route } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

export const SideNavBar = () => {
  return(
    <Route render={({ location, history }) => (
        <React.Fragment>
    <SideNav
    onSelect={(selected) => {
        const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
    }}
    style={{
        position: 'fixed',
        display: 'block',
      }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="mortgage">
            <NavIcon>
                <i className="fa fa-fw fas fa-university" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Mortgage
            </NavText>
        </NavItem>
        <NavItem eventKey="cashflow">
            <NavIcon>
                <i className="fa fa-fw fas fa-usd" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Cashflow
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
</React.Fragment>
    )}
    />
  )
}