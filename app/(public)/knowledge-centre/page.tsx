'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const ARTICLES = [
  {
    id: 1,
    title: 'Understanding SSP Fertilizers',
    category: 'Fertilizer Science',
    summary: 'Single Super Phosphate (SSP) provides phosphorus, calcium, and sulfur — three essential nutrients in a single product. Learn how SSP benefits soil health and crop yield.',
    content: 'SSP is one of the oldest and most widely used phosphatic fertilizers. It contains 16% P2O5, 12% S, and 21% Ca. Unlike DAP and complex fertilizers, SSP provides three essential nutrients — phosphorus, sulfur, and calcium — in a single application.\n\nSSP is manufactured by reacting rock phosphate with sulfuric acid. The Annadata brand SSP uses high-quality rock phosphate imported from Jordan Phosphate Mines Co., ensuring consistent nutrient content.\n\nKey benefits:\n• Provides phosphorus for root development and flowering\n• Contains sulfur for protein synthesis and oil content in oilseeds\n• Calcium improves soil structure and reduces acidity\n• Available in both powder and granular forms\n• Cost-effective compared to other phosphatic fertilizers',
  },
  {
    id: 2,
    title: 'Water Soluble Fertilizers: The Complete Guide',
    category: 'Application Guide',
    summary: 'WSF delivers nutrients directly to plants through drip irrigation or foliar spraying. Discover how SOP, MKP, MAP, NOP, and NPK formulations boost crop productivity.',
    content: 'Water Soluble Fertilizers (WSF) are 100% soluble in water, making them ideal for fertigation (drip/sprinkler) and foliar application. They provide immediately available nutrients to plants.\n\nAnnadata WSF range includes:\n• SOP 00:00:50 — Potassium for fruit development and quality\n• MKP 00:52:34 — Phosphorus and potassium for flowering stage\n• MAP 12:61:00 — High phosphorus for early root establishment\n• NOP 13:00:45 — Nitrate potassium for fruit filling stage\n• NPK 19:19:19 — Balanced nutrition for vegetative growth\n\nApplication tips:\n1. Dissolve completely before application\n2. Apply during early morning or late evening\n3. Maintain pH of spray solution between 5.5-6.5\n4. Do not mix with calcium-based fertilizers',
  },
  {
    id: 3,
    title: 'Micronutrient Deficiency in Indian Soils',
    category: 'Soil Health',
    summary: 'Over 50% of Indian soils are deficient in zinc, boron, and iron. Understand how micronutrient application can increase yield by 15-30%.',
    content: 'Indian soils face widespread micronutrient deficiency due to intensive cropping, imbalanced fertilization, and declining organic matter. Key deficiencies include:\n\n• Zinc: 49% of Indian soils are zinc-deficient\n• Boron: 33% deficiency, critical for fruit set and seed development\n• Iron: Common in calcareous soils of Rajasthan and Gujarat\n• Manganese: Deficiency in light-textured sandy soils\n\nAnnadata offers a complete micronutrient range:\n• Mono Zinc 33 — For zinc-deficient soils\n• Zinc 12% EDTA — Chelated for foliar spray\n• Ferrous 12% EDTA — For iron chlorosis correction\n• Sanjivani Boron 14.5 & 20% — For boron-responsive crops\n• Manganese Sulphate — For manganese deficiency\n\nTimely micronutrient application can increase yield by 15-30% and improve crop quality significantly.',
  },
  {
    id: 4,
    title: 'Calcium Nitrate for Quality Crop Production',
    category: 'Product Focus',
    summary: 'Vriddhi Calcium Nitrate addresses calcium deficiency, prevents blossom end rot, and improves fruit firmness and shelf life.',
    content: 'Calcium Nitrate is a dual-nutrient fertilizer providing both calcium (Ca) and nitrogen (N) in forms directly available to plants. The Annadata Vriddhi Calcium Nitrate is specially formulated for Indian farming conditions.\n\nKey applications:\n• Prevents blossom end rot in tomatoes and bell peppers\n• Improves fruit firmness and post-harvest shelf life\n• Strengthens cell walls, reducing disease susceptibility\n• Corrects calcium deficiency in acidic soils\n\nRecommended crops: Tomato, Capsicum, Cucumber, Apple, Grapes, Pomegranate\n\nDosage: 5-10 kg per acre through drip irrigation, or 3-5 gm/liter for foliar spray. Apply at flowering and fruit development stages.',
  },
  {
    id: 5,
    title: 'Organic Farming with Vermicompost',
    category: 'Organic Solutions',
    summary: 'Vermicompost enriches soil biology, improves water retention, and gradually releases nutrients. Combine with Annadata bio products for best results.',
    content: 'Vermicompost is an excellent organic soil amendment produced by earthworm processing of organic waste. Annadata Vermicompost is rich in humus, beneficial microorganisms, and plant growth hormones.\n\nBenefits:\n• Improves soil structure and water-holding capacity\n• Enhances beneficial microbial activity\n• Provides slow-release nutrients (NPK + micronutrients)\n• Reduces soil-borne diseases\n• Safe for all crops, including organic farming\n\nApplication rates:\n• Field crops: 2-4 tons per acre\n• Vegetables: 4-5 tons per acre\n• Fruit trees: 5-10 kg per tree\n\nFor integrated nutrition management, combine Annadata Vermicompost with Bhumi Rakshak Soil Conditioner and targeted micronutrient applications.',
  },
];

const FAQ = [
  { q: 'What is SSP fertilizer and how is it made?', a: 'SSP (Single Super Phosphate) is a phosphatic fertilizer containing 16% P2O5, 12% Sulfur, and 21% Calcium. It is manufactured by reacting rock phosphate with sulfuric acid. Annadata SSP uses premium-grade rock phosphate sourced from Jordan Phosphate Mines Co.' },
  { q: 'Which Annadata product is best for wheat?', a: 'For wheat, we recommend SSP (Granular) as basal dose for phosphorus, followed by Mono Zinc 33 at sowing for zinc nutrition. During vegetative stage, use NPK 19:19:19 through foliar spray. Use our Dose Calculator for precise recommendations.' },
  { q: 'Are Annadata fertilizers suitable for organic farming?', a: 'Our Vermicompost and Bhumi Rakshak Soil Conditioner are excellent for organic farming. Other products like SSP and micronutrients are permitted in integrated crop management but may not qualify under strict organic certification protocols.' },
  { q: 'Where can I buy Annadata products?', a: 'Annadata products are available through our authorized dealer network across Rajasthan, Madhya Pradesh, Gujarat, Uttar Pradesh, and Maharashtra. Use our Dealer Locator to find the nearest retailer.' },
  { q: 'How do I calculate the right fertilizer dose?', a: 'Use our online Dose Calculator tool. Select your crop, application type, growth stage, and land area to get precise Annadata product recommendations with exact quantities.' },
  { q: 'What is the shelf life of Annadata fertilizers?', a: 'Granular fertilizers like SSP and Calcium Nitrate have a shelf life of 6-12 months when stored in a cool, dry place. Water Soluble Fertilizers should be used within 12 months. Liquid products like Zinc Suspension Concentrate last 12-18 months.' },
];

export default function KnowledgeCentrePage() {
  const [activeArticle, setActiveArticle] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <>
      {/* Header */}
      <SectionWrapper bg="white" noPadding className="pt-8 pb-4">
        <ScrollReveal>
          <SectionLabel>Knowledge Centre</SectionLabel>
          <SectionHeading className="mt-2" as="h1" size="lg">
            Learn About Crop Nutrition
          </SectionHeading>
          <p className="text-body-text font-body mt-3 max-w-2xl">
            Expert articles, fertilizer guides, and farming tips from the Annadata
            agronomist team to help you make informed crop nutrition decisions.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      {/* Articles */}
      <SectionWrapper bg="section">
        <div className="text-center mb-10">
          <SectionLabel>Featured Articles</SectionLabel>
          <SectionHeading className="mt-2">Fertilizer Knowledge Hub</SectionHeading>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ARTICLES.map((article) => (
            <StaggerItem key={article.id}>
              <div className="bg-white rounded-lg p-6 shadow-tech-soft h-full flex flex-col">
                <span className="text-xs font-bold font-body text-teal tracking-[0.1em] uppercase mb-2">
                  {article.category}
                </span>
                <h3 className="font-heading font-semibold text-charcoal text-base mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-body-text font-body line-clamp-3 mb-4 flex-1">
                  {article.summary}
                </p>
                <button
                  onClick={() => setActiveArticle(activeArticle === article.id ? null : article.id)}
                  className="text-coral font-semibold text-sm font-body hover:underline text-left"
                >
                  {activeArticle === article.id ? 'Close ✕' : 'Read More →'}
                </button>
                <AnimatePresence>
                  {activeArticle === article.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-border-subtle text-sm text-body-text font-body leading-relaxed whitespace-pre-line">
                        {article.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel>FAQ</SectionLabel>
            <SectionHeading className="mt-2">Frequently Asked Questions</SectionHeading>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-section-bg rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-heading font-semibold text-charcoal text-sm">
                      {item.q}
                    </span>
                    <span className={`text-coral text-xl transition-transform duration-300 shrink-0 ${
                      activeFaq === i ? 'rotate-45' : ''
                    }`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-body-text font-body leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
