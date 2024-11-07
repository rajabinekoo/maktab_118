// import "./about-us.css";
import Button from "@mui/material/Button";
import { Title } from "@/components/title";
import styles from "./about-us.module.css";

const AboutUs: React.FC = () => {
  return (
    <div>
      <p className={styles["title"]}>About us</p>
      <Title>About us</Title>
      <Button variant="contained">ok</Button>
    </div>
  );
};

export default AboutUs;
