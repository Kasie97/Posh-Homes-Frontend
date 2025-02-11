import { AxiosError } from "axios";
import axiosInstance from "../request/axiosInstance";
import { UserActions } from "../Service/user";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";


export const ResetPassword =
  (dispatch: Dispatch) => (data: any) => async (navigate: NavigateFunction) => {
    try {
      dispatch(UserActions.startLoading(true));

      const res = await axiosInstance.post("/api/resetPassword", data);
      dispatch(UserActions.ResetPassword());
      toast.success(res.data.message, { autoClose: 3000 });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      const customErr = error as AxiosError;

      const err = customErr.response?.data as { error: string };
      toast.error(err.error ? err.error : "Something went wrong");
      dispatch(
        UserActions.updateUserFail(
          err.error ? err.error : "Something went wrong"
        )
      );
    }
  };
