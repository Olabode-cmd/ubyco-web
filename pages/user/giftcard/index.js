import React, {useState} from "react";

// @material-ui/core
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

//form input
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import CustomInput from "components/CustomInput/CustomInput.js";
import MenuItem from '@material-ui/core/MenuItem';


// @material-ui/icons
import Store from "@material-ui/icons/Store";
import {BiBitcoin} from 'react-icons/bi'
import {MdCardGiftcard} from 'react-icons/md'

import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";

import ArrowUpward from "@material-ui/icons/ArrowUpward";

// layout for this page
import User from "layouts/User.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import Table from "components/Table/Table.js";
import Success from "components/Typography/Success.js"
import Card from "components/Card/Card.js";
import { getSession } from "next-auth/client";
import Server from '../../api/lib/Server'

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import MaterialTable from "material-table";
import {GiBanknote} from 'react-icons/gi'

// import styling from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import avatar from "assets/img/faces/marc.jpg";

// import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button.js";



const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl : {
    minWidth: "100%",
    padding: "5px",
  },
  formTitle: {
    fontSize: "16px",
    color: "#aaa",
  },
  textInput: {
    fontSize: "16px",
    paddingBottom: "4px"
  }
};

function Giftcard(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
   //card and type selected value
  const [brandValue, setBrandValue] = React.useState("");
  const [typeValue, setTypeValue] = React.useState("");
  const [type, setType] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
 
  //amount state
  const [amount, setAmount] = React.useState('');
  const [comment, setComment] = React.useState(null);
  const [total, setTotal] = React.useState(0)
  const [id, setId] = React.useState(null)
  const [image, setImage] = React.useState(null);
  import Server from '../../api/lib/Server'

 

   //when brand is selected
  const onBrandSelect = async (event) => {
    setBrandValue(event.target.value);
    const res = props.cards.find(card => card.id === event.target.value)
    setType(res.cardTypes)
  }
  //when price changes multiply the amount by the rate
  const priceChange = async (event) => {
    console.log("i am triggered")
    // setAmount(event.target.value)
    const value = type.find(card => card.id === typeValue)
    const sum  = Number(event.target.value * value.rate)
    console.log(sum)
    setTotal(sum)
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>

          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Trade Gift Cards</h4>
              <p className={classes.cardCategoryWhite}>Kindly select all required</p>
            </CardHeader>
            <form onSubmit={(e) => handleLogin(e)} data-toggle="validator" enctype="multipart/form-data">
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" className={classes.formTitle}>Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={brandValue}
                      onChange={(e) => onBrandSelect(e)}
                      required
                    >
                        {props.cards.length > 0 ? props.cards.map(card => (
                        <MenuItem value={card.id} key={card.id}>
                          <p>{card.name}</p>
                        </MenuItem>
                      )) : 0}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" className={classes.formTitle}>Card Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={typeValue}
                      onChange={(e) => setTypeValue(e.target.value)}
                      required
                    >
                      {type.length > 0 ? type.map(card => (
                        <MenuItem value={card.id} key={card.id}>
                          <p>{card.name}</p>
                        </MenuItem>
                      )) : <MenuItem>
                      <p>Not Available</p>
                    </MenuItem>}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Amount"
                    id="amount"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      
                    }}
                    value={amount}
                    onChange={(e) => priceChange(e)}
                    required
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Total"
                    id="total"
                    placeholder="0"
                    onChange ={setTotal}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={total}
                    inputProps={{
                      type: "number",
                      disabled: true,
                    }}
                    disabled
                
                  />
                </GridItem>
              
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Comments</InputLabel>
                  <CustomInput
                    id="comment"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3,
                    }}
                    value={comment}
                    onChange={(e) => setComment(event.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                <label for="formFileMultiple" class="form-label">Upload GiftCard</label>
                  <input class="form-control" type="file" id="formFileMultiple" multiple />
               
              </GridItem>

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit" disabled={loading}>
                  Trade Card
                </Button>
            </CardFooter>
          </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Giftcard.layout = User;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = session?.accessToken;
  const card = await Server.get("/user/card", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const cards = card.data.message;

  return {
    props: {
      cards,
    },
  };
}
export default Giftcard;

