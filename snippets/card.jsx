/**
 * Card Component
 * A reusable card component for displaying content with title, subtitle, description, and CTA.
 * Supports both light and dark mode via explicit color props.
 *
 * @param {string} title - Main title of the card (required)
 * @param {string} subtitle - Optional subtitle text (smaller, appears above title)
 * @param {string} description - Description text below the title
 * @param {string} category - Optional category text (appears with colored dot)
 * @param {string} ctaText - Text for the call-to-action button
 * @param {string} ctaLink - URL for the CTA button
 * @param {string} borderColor - Border color class (e.g., "border-green-500", "border-orange-500")
 * @param {string} bgColor - Outer background color for light mode (e.g., "#f9f8f6")
 * @param {string} darkBgColor - Outer background color for dark mode (e.g., "#1a1a1a")
 * @param {string} innerBgColor - Inner background color for light mode (e.g., "#ffffff")
 * @param {string} darkInnerBgColor - Inner background color for dark mode (e.g., "#111111")
 * @param {string} textColor - Text color for light mode (e.g., "#000000")
 * @param {string} darkTextColor - Text color for dark mode (e.g., "#ffffff")
 * @param {string} ctaVariant - CTA style variant: "default" (link + icon button) or "button" (single button with text + arrow)
 * @param {string} className - Additional classes to merge with defaults
 */
export const CustomCard = ({
    title,
    subtitle,
    description,
    category,
    ctaText = "View article",
    ctaLink = "#",
    borderColor = "dark:border-white/10 border-gray-400",
    bgColor,
    darkBgColor,
    innerBgColor,
    darkInnerBgColor,
    textColor,
    darkTextColor,
    ctaVariant = "default",
    className = "",
}) => {
    // ===== STATE =====
    const [isDark, setIsDark] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        const html = document.documentElement;
        const check = () => setIsDark(html.classList.contains("dark"));
        check();
        const observer = new MutationObserver(check);
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    // ===== RESOLVED COLORS =====
    const hasCustomColors = bgColor || darkBgColor || innerBgColor || darkInnerBgColor || textColor || darkTextColor;

    const resolvedOuterBg = isDark
        ? (darkBgColor || "transparent")
        : (bgColor || "transparent");

    // Default inner bg to white/dark when outer bg is set, so the inner area contrasts
    const defaultInnerBgLight = bgColor ? "#ffffff" : undefined;
    const defaultInnerBgDark = darkBgColor ? "#1a1a1a" : undefined;

    const resolvedInnerBg = isDark
        ? (darkInnerBgColor || defaultInnerBgDark)
        : (innerBgColor || defaultInnerBgLight);

    const resolvedText = isDark
        ? (darkTextColor || undefined)
        : (textColor || undefined);

    // ===== STYLES =====
    const cardStyles = {
        container: "flex flex-col h-full",
        upperContainer: [
            "border dark:border-white/10 border-gray-400 p-4 rounded-xl h-full",
            !resolvedInnerBg && !hasCustomColors ? "" : "",
        ].join(" "),
        padding: "p-2",
        shape: "rounded-2xl",
        border: `border ${borderColor}`,
        spacing: "gap-3",
    };

    const categoryStyles = {
        container: "flex items-center gap-2",
        dot: "h-2 w-2 rounded-full",
        text: hasCustomColors ? "" : "dark:text-gray-200 text-gray-600",
    };

    const titleStyles = {
        main: hasCustomColors
            ? "text-xl font-bold mb-4 mt-2"
            : "text-xl font-bold mb-4 mt-2 dark:text-white text-gray-900",
        subtitle: hasCustomColors
            ? "text-sm font-normal"
            : "dark:text-gray-200 text-gray-600 font-normal",
    };

    const descriptionStyles = {
        text: hasCustomColors
            ? "leading-relaxed"
            : "dark:text-gray-200 text-gray-600 leading-relaxed",
    };

    const ctaStyles = {
        container: "flex items-center justify-between mt-auto py-2 pl-2",
        link: hasCustomColors
            ? "hover:opacity-80 transition-colors"
            : "dark:text-gray-200 text-gray-700 hover:text-gray-900 transition-colors",
        button: "flex items-center justify-center h-8 w-8 rounded-md hover:opacity-90 transition-opacity",
        buttonVariant: hasCustomColors
            ? "flex items-center gap-2 rounded-md transition-colors border-none"
            : "flex items-center gap-2 rounded-md dark:text-gray-200 text-gray-700 transition-colors border-none",
        icon: hasCustomColors ? "h-4 w-4" : "h-4 w-4 text-white",
        iconButton: hasCustomColors ? "h-4 w-4" : "h-4 w-4 dark:text-gray-200 text-gray-700",
    };

    // Combine card styles
    const cardClasses = [
        cardStyles.container,
        cardStyles.padding,
        cardStyles.shape,
        cardStyles.border,
        cardStyles.spacing,
        className,
    ].join(" ");

    // ===== RENDER =====
    return (
        <a
            href={ctaLink}
            className={`${cardClasses} no-underline cursor-pointer`}
            style={{
                backgroundColor: resolvedOuterBg,
                textDecoration: "none",
                color: resolvedText || "inherit",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={cardStyles.upperContainer}
                style={{
                    backgroundColor: resolvedInnerBg || undefined,
                    color: resolvedText || undefined,
                }}
            >
                {/* Category with dot (optional) */}
                {category && (
                    <div className={categoryStyles.container}>
                        <div className={`${categoryStyles.dot} bg-red-500`} />
                        <span className={categoryStyles.text}>{category}</span>
                    </div>
                )}

                {/* Subtitle (optional) */}
                {subtitle && (
                    <p className={titleStyles.subtitle}>{subtitle}</p>
                )}

                {/* Main Title */}
                {title && (
                    <h3 className={titleStyles.main}>{title}</h3>
                )}

                {/* Description */}
                {description && (
                    <p className={descriptionStyles.text}>{description}</p>
                )}
            </div>

            {/* CTA Section */}
            <div
                className="mt-auto rounded-xl"
                style={{
                    backgroundColor: isHovered ? (resolvedInnerBg || (isDark ? "#1a1a1a" : "#ffffff")) : "transparent",
                    border: isHovered ? `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(156,163,175,1)"}` : "1px solid transparent",
                    transition: "background-color 0.3s ease, border-color 0.3s ease",
                }}
            >
                {ctaVariant === "button" ? (
                    <div className="py-2 px-2">
                        <div className={ctaStyles.buttonVariant}>
                            <span>{ctaText}</span>
                            <svg
                                className={ctaStyles.iconButton}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div className={ctaStyles.container}>
                        <span className={ctaStyles.link}>
                            {ctaText}
                        </span>
                        <span
                            className={ctaStyles.button}
                            aria-label={ctaText}
                        >
                            <svg
                                className={ctaStyles.icon}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </span>
                    </div>
                )}
            </div>
        </a>
    );
};
