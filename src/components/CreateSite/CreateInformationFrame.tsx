import { FunctionComponent} from "react";
import styles from "./CreateInformationFrame.module.css";

import {

  DateField,

  LocalizationProvider,

  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

interface CreateInformationFrameType {
  title: string;
  description: string;
  time: dayjs.Dayjs;
  date: dayjs.Dayjs;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const CreateInformationFrame: FunctionComponent<CreateInformationFrameType> = ({
  title,
  description,
  time,
  date,
  setTitle,
  setDescription,
  setTime,
  setDate,
}) => {


  return (
    <div className={styles.createInformationFrame}>
      <div className={styles.gizDetailsFrame}>
        <div className={styles.titleAndDescription}>
          <div className={styles.title}>
            <i className={styles.headline}>TITLE</i>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
              placeholder="Title"
              type="text"
              required
            />
          </div>
          <div className={styles.title}>
            <i className={styles.headline}>DESCRIPTION</i>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.descriptionTextarea}
              placeholder="Description"
              required
            />
          </div>
        </div>

        <div className={styles.dateAndTime}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.date}>
              <DateField
                label="Now"
                value={date}
                onChange={(newValue: dayjs.Dayjs | null | undefined ) => {
                  if (newValue !== null && newValue !== undefined) {
                    setDate(newValue) 
                  } else { setDate(dayjs())}
                }}
                variant="standard"
                format="DD-MM-YYYY"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  input: {
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Anybody",
                    fontSize: "20px",
                    fontWeight: "Regular",
                    paddingBottom: "15px",
                  },
                }}
              />
            </div>
            <div className={styles.date}>
              <TimeField
                label="Format without meridiem"
                value={time}
                format="HH:mm"
                onChange={(newValue: dayjs.Dayjs | null | undefined ) => {
                  if (newValue !== null && newValue !== undefined) {
                    setTime(newValue) 
                  } else { setTime(dayjs())}
                }}
                variant="standard"
                sx={{
                  input: {
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Anybody",
                    fontSize: "20px",
                    fontWeight: "Thin",
                    paddingBottom: "15px",
                  },
                }}
              />
            </div>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateInformationFrame;
