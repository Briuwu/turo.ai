import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: Add a basic font
Font.register({
  family: "Helvetica",
  fonts: [{ src: "https://fonts.gstatic.com/s/helvetica/Helvetica.ttf" }],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftHeader: {
    flexDirection: "column",
    width: "60%",
  },
  rightHeader: {
    alignItems: "flex-end",
    width: "40%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  line: {
    borderBottom: "1pt solid black",
    width: "100%",
    marginBottom: 8,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  lineBox: {
    width: 80,
    marginRight: 10,
    justifyContent: "center",
  },
  answerLine: {
    borderBottom: "1pt solid black",
    width: "100%",
    height: 10,
    marginBottom: 5,
  },
  questionText: {
    flex: 1,
  },
  number: {
    fontWeight: "bold",
  },
  dateBox: {
    border: "1pt solid black",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
});

type Props = {
  questions: string[];
};

// PDF component
export const ExamSheet = ({ questions }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.label}>Name:</Text>
          <View style={styles.line} />
          <Text style={styles.label}>Section:</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.label}>Date:</Text>
          <View style={styles.dateBox}>
            <Text>________________</Text>
          </View>
        </View>
      </View>

      {/* Questions */}
      {questions.map((q, idx) => (
        <View key={idx} style={styles.questionRow}>
          {/* Left blank line */}
          <View style={styles.lineBox}>
            <View style={styles.answerLine} />
          </View>

          {/* Right question text */}
          <Text style={styles.questionText}>
            <Text style={styles.number}>{`${idx + 1}. `}</Text>
            {q}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);
