/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
/* eslint-enable no-unused-vars */

class MTableAction extends React.Component {
  render() {
    let action = this.props.action;
    const disabled = action.disabled || this.props.disabled;
    if (typeof action === "function") {
      action = action(this.props.data);
      if (!action) {
        return null;
      }
    }

    if (action.action) {
      action = action.action(this.props.data);
      if (!action) {
        return null;
      }
    }

    if (action.hidden) {
      return null;
    }

    const handleOnClick = event => {
      if (action.onClick) {
        action.onClick(event, this.props.data);
        event.stopPropagation();
      }
    };

    let button;
    if (action.type === "button") {
      button = (
        <Button
          onClick={event => handleOnClick(event)}
          {...action.btnprops}
        >
          {action.icon}
        </Button>
      );
    } else {
      const icon =
        typeof action.icon === "string" ? (
          <Icon {...action.iconProps}>{action.icon}</Icon>
        ) : typeof action.icon === "function" ? (
          action.icon({ ...action.iconProps, disabled: disabled })
        ) : (
          <action.icon />
        );

      button = (
        <IconButton
          size={this.props.size}
          color="inherit"
          disabled={disabled}
          onClick={event => handleOnClick(event)}
        >
          {icon}
        </IconButton>
      );
    }

    if (action.tooltip) {
      // fix for issue #1049
      // https://github.com/mbrn/material-table/issues/1049
      return disabled ? (
        <Tooltip title={action.tooltip}>
          <span>{button}</span>
        </Tooltip>
      ) : (
        <Tooltip title={action.tooltip}>{button}</Tooltip>
      );
    } else {
      return button;
    }
  }
}

MTableAction.defaultProps = {
  action: {},
  data: {}
};

MTableAction.propTypes = {
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  disabled: PropTypes.bool,
  size: PropTypes.string
};

export default MTableAction;
