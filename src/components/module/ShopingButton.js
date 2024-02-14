"use client";

import { e2p, sp } from "@/utils/replaceNumbers";
import { useEffect, useState } from "react";
import {
  AddRoadRounded,
  AddRounded,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Input,
  Snackbar,
  SvgIcon,
  Textarea,
  Typography,
} from "@mui/joy";
import axios from "axios";
import Cookies from "universal-cookie";
import GeneralLoader from "./GeneralLoader";

const ShopingButton = ({ productList }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productId, steProductId] = useState();

  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const IncrementCount = () => {
    setCount((perv) => (perv += 1));
  };

  const DecrementCount = () => {
    if (count > 0) {
      setCount((perv) => (perv -= 1));
    }
  };

  useEffect(() => {
    steProductId(productList);
  }, []);

  // API-------------------------------------------------

  const cookie = new Cookies();

  const Auth = cookie.get("tokenDastResi") ? cookie.get("tokenDastResi") : null;

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": "application/json",
  };

  async function AddProductToBasketApi(pId) {
    if (count > 0) {
      setLoading(true);
      await axios
        .post(
          "https://supperapp-backend.chbk.run/user_basket/create",
          {
            product_id: `${pId}`,
            numbers: count,
          },
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response);
          setMessage(
            " کالا به سبد خرید افزوده شد. برای تکمیل مراحل خرید به سبد خرید بروید "
          );
          setAlert(true);
          setLoading(false);
          setCount(0);
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است یا وارد حساب کاربری شوید ");
          setErrorAlert(true);
          setLoading(false);
        });
    } else {
      setMessage(" حداقل میزان سفارش یک عدد است ");
      setErrorAlert(true);
    }
  }

  return (
    <>
      <Card
        variant="solid"
        invertedColors
        className=" max-w-lg  bg-blue-950 relative"
      >
        <CardContent className="flex flex-row gap-6 items-center justify-normal w-full">
          <div className=" flex flex-row justify-start items-center flex-nowrap w-2/3">
            <CircularProgress size="lg" determinate value={0}>
              <SvgIcon>
                <ShoppingCartCheckout />
              </SvgIcon>
            </CircularProgress>
            <h2 className="text-3xl">
              {" "}
              {e2p(sp(productList.seller_info[0].price))}{" "}
              <span className="text-base"> ریال </span>{" "}
            </h2>
          </div>
          <Chip color="danger" className="p-2 text-sm  bg-rose-600 w-1/3 ">
            تخفیف {e2p(productList.seller_info[0].off)}%{" "}
          </Chip>
        </CardContent>

        <CardActions className="w-full text-center flex justify-center items-center">
          <Button
            onClick={() =>
              AddProductToBasketApi(productId.seller_info[0].product_id)
            }
            ariant="contained"
            className="w-1/2 bg-khas text-yellow-100 rounded-xl p-2 hover:bg-orange-600 transition-colors duration-300"
          >
            {loading ? <GeneralLoader /> : "افزودن به سبد خرید"}{" "}
            {loading ? "" : <AddRounded />}
          </Button>

          <div className="flex flex-row-reverse justify-center items-center w-1/2">
            <button
              onClick={() => DecrementCount()}
              className="w-1/5 border-2 bg-mainBlack rounded-lg rounded-r-none border-khas h-10 text-lg "
            >
              {" "}
              -{" "}
            </button>
            <Input
              value={e2p(count)}
              className="w-1/5 h-[32px] rounded-none bg-white text-black text-lg "
            />
            <button
              onClick={() => IncrementCount()}
              className="w-1/5 border-2 bg-mainBlack rounded-lg rounded-l-none h-10 text-lg border-khas "
            >
              {" "}
              +{" "}
            </button>
          </div>
        </CardActions>
      </Card>

      <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="bg-green-800"
      >
        <Alert
          variant="filled"
          severity="success"
          className="text-lg text-white font-semibold bg-green-800 text-center"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="bg-rose-700"
        invertedColors
      >
        <Alert
          variant="filled"
          severity="error"
          invertedColors
          className="text-lg text-white font-semibold bg-rose-700 text-center"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShopingButton;
