/** @format */

import React from "react";
import { Button } from "semantic-ui-react";

type ButtonProps = {
    handleSubmit: () => void;
};

const ButtonField = ({ handleSubmit }: ButtonProps) => (
    <Button attached="bottom" onClick={handleSubmit} data-test={"home-submit-button"}>
        Submit URL
    </Button>
);

export default ButtonField;
