import { FunctionComponent } from "react";
import styles from "./CreateInformationFrame.module.css";

import {
  DateField,
  DatePicker,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
              autoComplete="new-password"
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
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className={styles.dateAndTime}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.dateFrame}>
              <i className={styles.headline}>DATE</i>
              <div className={styles.date}>
                {isMobile ? (
                  <DatePicker
                    label="Now"
                    value={date}
                    onChange={(newValue: dayjs.Dayjs | null | undefined) => {
                      if (newValue !== null && newValue !== undefined) {
                        setDate(newValue);
                      } else {
                        setDate(dayjs());
                      }
                    }}
                    format="DD-MM-YYYY"
                    sx={{
                      input: {
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Anybody",
                        fontSize: isMobile ? "16px" : "20px",
                        fontWeight: "Regular",
                        paddingBottom: "15px",
                        width: "100%",
                      },
               
          
                      "& .MuiIconButton-root": {
                        display: "none",
                      },
                    }}
                    
                  />
                ) : (
                  <DateField
                  
                    label="Now"
                    value={date}
                    onChange={(newValue: dayjs.Dayjs | null | undefined) => {
                      if (newValue !== null && newValue !== undefined) {
                        setDate(newValue);
                      } else {
                        setDate(dayjs());
                      }
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
                        fontWeight: "Regular",
                        paddingBottom: "15px",
                        width: "100%",
                      },
                    }}
                  />
                )}
              </div>
            </div>
            <div className={styles.dateFrame}>
              <i className={styles.headline}>TIME</i>
              <div className={styles.date}>
                <TimeField
                
                  label="Format without meridiem"
                  value={time}
                  format="HH:mm"
                  onChange={(newValue: dayjs.Dayjs | null | undefined) => {
                    if (newValue !== null && newValue !== undefined) {
                      setTime(newValue);
                    } else {
                      setTime(dayjs());
                    }
                  }}
                  variant="standard"
                  sx={{
                    input: {
                      textAlign: "center",
                      color: "white",
                      fontFamily: "Anybody",
                      fontSize: isMobile ? "16px" : "20px",
                      fontWeight: "Thin",
                      paddingBottom: "15px",
                      width: "100%",
                    },
                  }}
                />
              </div>
            </div>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateInformationFrame;
