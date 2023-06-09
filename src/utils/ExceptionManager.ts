import { Response } from "express";
import { AccountConfirmedException } from "../exceptions/authExceptions/AccountConfirmedException";
import { AccountUnconfirmedException } from "../exceptions/authExceptions/AccountUnconfirmedException";
import { BadCredentialsException } from "../exceptions/authExceptions/BadCredentialsException";
import { InternalErrorException } from "../exceptions/authExceptions/InternalErrorException";
import { UserExistException } from "../exceptions/authExceptions/UserExistException";
import { InvalidNameException } from "../exceptions/groupExceptions/InvalidNameException";
import { InvalidFormatDayException } from "../exceptions/groupExceptions/InvalidFormatDayException";
import { InvalidTimeFormatException } from "../exceptions/groupExceptions/InvalidTimeFormatException";
import { GroupNotFoundException } from "../exceptions/groupExceptions/GroupNotFoundException";
import { InvalidActionGroupException } from "../exceptions/groupExceptions/InvalidActionGroup";

function exceptionManager(res: Response, error: Error | any): Response {
    console.log(error);
    // This exception is executed when a user cannot be found in DB
    if (error instanceof UserExistException) {
        return res.status(409).json({ msg: error.msg, error: error.isError })
    }

    // Internal error: DB, other...
    if (error instanceof InternalErrorException) {
        return res.status(500).json({ msg: error.msg, error: error.isError })
    }

    // This exception is executed by some erroneous data by the user.
    if (error instanceof BadCredentialsException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }

    // This exception is executed when you want to confirm an account
    // already confirmed.
    if (error instanceof AccountConfirmedException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }

    // This exception is executed when you want to start when making a 
    // request with an unconfirmed account.
    if (error instanceof AccountUnconfirmedException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }


    // ------------------------------- GROUP EXCEPTIONS---------------------------------
    if (error instanceof InvalidNameException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }

    if (error instanceof InvalidFormatDayException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }

    if (error instanceof InvalidTimeFormatException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }

    if (error instanceof GroupNotFoundException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }

    if (error instanceof InvalidActionGroupException) {
        return res.status(400).json({ msg: error.msg, error: error.isError })
    }



    return res.status(500).json({ msg: "ERROR", error: true })

}

export default exceptionManager