import { Helmet } from 'react-helmet-async';
import portfolioConfig from "@/data/portfolio.config.json";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  author?: string;
}

export const SEO = ({
  title = "Nasir Khan | Full Stack Developer",
  description = "Nasir Khan is a Full Stack Developer specialized in building scalable backend systems and modern web applications with Node.js, TypeScript, React, and Next.js.",
  keywords = [
    "Full Stack Developer", 
    "Backend Engineer", 
    "React Developer", 
    "Node.js", 
    "TypeScript", 
    "Next.js", 
    "Portfolio",
    "React & Node.js Engineer",
    "Web Application Architect",
    "JavaScript Performance Optimization",
    "Scalable Systems",
    "Software Engineering"
  ],
  image = "/avatar-new.jpg",
  url = "https://www.nasirkhan.dev",
  author = "Nasir Khan"
}: SEOProps) => {
  const fullTitle = title === "Nasir Khan | Full Stack Developer" ? title : `${title} | Nasir Khan`;
  const fullUrl = url.startsWith("http") ? url : `https://www.nasirkhan.dev${url}`;
  const fullImage = image.startsWith("http") ? image : `https://www.nasirkhan.dev${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author,
    "url": "https://www.nasirkhan.dev",
    "image": fullImage,
    "sameAs": [
      portfolioConfig.socials.github,
      portfolioConfig.socials.linkedin,
      portfolioConfig.socials.twitter
    ],
    "jobTitle": "Full Stack Developer",
    "description": description,
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    }
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Nasir Khan Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@nasir_khan83353" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
