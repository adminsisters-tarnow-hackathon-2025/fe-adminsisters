import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosRequest } from "@/hooks/useAxios";
import { selectUser, setCoins } from "@/store/userSlice";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
export const CodeScanning = () => {
  const user = useSelector(selectUser);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [scanned, setScanned] = useState<string | null>();
  const dispatch = useDispatch();

  const handleScan = (result: string) => {
    setScanned(result);

    async function handleScane() {
      const response = await axiosRequest<void, { amount: number }>({
        url: `api/users/${user.user?.data.id}/add-coin`,
        method: "POST",
        data: {
          amount: 10,
        },
        defaultErrorMessage: "Failed to add coins",
        successMessage: "Coins added successfully",
      });
      dispatch(setCoins(user.user?.data.coinAmount ?? 0 + 10));
      alert(response);
      // user.user?.data.coinAmount = response.data;
    }

    handleScane();

    axiosRequest({
      url: `api/users/${user.user?.data.id}/events/${result}`,
      method: "POST",
      defaultErrorMessage: "Failed to add user to event",
      successMessage: "User to event added successfully",
    });

    setTimeout(() => {
      navigate("/events/01974302-d2e9-70d7-8b05-95b9c4a74054");
    }, 3000);
  };

  return (
    <>
      {
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Skanowanie kodu imprezy</CardTitle>
            <CardDescription>
              Znajdź kod imprezy i zeskanuj go, aby otrzymać nagrodę.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Scanner
              paused={!!scanned}
              classNames={{
                container: "rounded-md",
              }}
              onScan={(result) => handleScan(result[0].rawValue)}
            />
            {scanned && (
              <div className="text-center text-green-500">
                Pomyślnie zeskanowano kod, nagroda zostanie przyznana.
                Przekierowywanie...
              </div>
            )}
          </CardContent>
        </Card>
      }
    </>
  );
};
