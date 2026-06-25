import { serverMutation } from "../core/server";

export const paymentDataSave = async (data) => {
    return await serverMutation(`api/payments/save/`, data);
};