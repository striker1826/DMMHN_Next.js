import Button from "@/shared/components/Button/Button";
import styles from "./Start.module.scss";

interface Props {
  onChangeStatus: (status: "ready" | "start" | "end") => void;
}

export const Start = ({ onChangeStatus }: Props) => {
  return (
    <>
      <div className={styles.top_layout}>
        <div className={styles.question_information}>
          <div className={styles.question_type}>공통질문</div>
          <div className={styles.question_current_total}>Q1 / Q20</div>
        </div>
        <button className={styles.recoder_btn} onClick={() => console.log("recoding")}>
          영상 기록하기
        </button>
      </div>
      <p className={styles.question}>Q1.</p>
      <p className={styles.question}>var / let / const에 대한 설명 및 차이를 설명해주세요.</p>
      <div className={styles.recoding_display} />
      <Button text="다음 질문으로 &gt;" onClick={() => onChangeStatus("end")} />
    </>
  );
};
