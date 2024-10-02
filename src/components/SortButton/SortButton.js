import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import './SortButton.scss';

export const SortButton = ({ onSort }) => {
    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Button
                    variant="ghost"
                    className='SortButton'
                >
                    Sort by date
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Sort by date"
                onAction={(key) => {
                    if (key === "new") {
                        onSort('new');
                    } else if (key === "old") {
                        onSort('old');
                    }
                }}
            >
                <DropdownItem key="new">Newest First</DropdownItem>
                <DropdownItem key="old">Oldest First</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

SortButton.propTypes = {
    onSort: PropTypes.func,
}
