import Card from "@mui/material/Card";
import { motion } from "framer-motion";
import React from "react";

export default function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ p: 2, boxShadow: 3 }}>
        {children}
      </Card>
    </motion.div>
  );
}
