"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import Container, {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardCTA,
  CardGrid,
} from "@/components/animations/container";

export default function FeaturesSection({ data }: { data: any }) {
  const features = [
    {
      icon: "⚡",
      title: data.instant_withdrawals?.title,
      description: data.instant_withdrawals?.description,
    },
    {
      icon: "🛡️",
      title: data.secure_trusted?.title,
      description: data.secure_trusted?.description,
    },
    {
      icon: "💳",
      title: data.multiple_payment_options?.title,
      description: data.multiple_payment_options?.description,
    },
  ];

  return (
    <Container delay={0.12}>
      {/* Section Heading */}
      <div className="mb-12">
        <SectionTitle icon="✨" text={data.title} />
      </div>

      {/* Features Grid */}
      <CardGrid cols={{ default: 1, md: 3 }}>
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Card>
              <CardIcon>{feature.icon}</CardIcon>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
              <CardCTA>
                {data.cta} <span className="text-lg">→</span>
              </CardCTA>
            </Card>
          </motion.div>
        ))}
      </CardGrid>
    </Container>
  );
}
