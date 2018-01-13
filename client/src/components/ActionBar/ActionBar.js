import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { TextField,FlatButton } from 'material-ui';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

export default class ActionBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
            <Toolbar style={{backgroundcolor:'1318c8'}} >
                <ToolbarGroup firstChild={true}>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="Test_1" />
                        <MenuItem value={2} primaryText="Test_2" />
                        <MenuItem value={3} primaryText="Test_3" />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                <input type='text' name='search' onChange={this.props.search} placeholder='search...' />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="Navigation Menu" />
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarSeparator />               
                       
                    <Badge
                        badgeContent={10}
                        secondary={true}
                        badgeStyle={{ top: 12, right: 12 }}
                    >
                        <IconButton tooltip="Notifications">
                            <NotificationsIcon />
                        </IconButton>
                    </Badge>
                    <FlatButton>Login</FlatButton>
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <NavigationExpandMoreIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem primaryText="Download" />
                        <MenuItem primaryText="More Info" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}