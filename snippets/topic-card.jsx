/**
 * TopicCard Component
 * A card with a top image, icon bubble, title, and description.
 * Supports light and dark mode via explicit color props.
 *
 * @param {string} title - Main title of the card (required)
 * @param {string} description - Description text below the title
 * @param {string} href - URL the card links to
 * @param {string} image - URL or path for the top image
 * @param {string} imageAlt - Alt text for the top image
 * @param {string} iconUrl - URL or path for the icon displayed in the bubble (e.g., SVG or image URL)
 * @param {string} iconSize - Size of the icon inside the bubble in px (default "20")
 * @param {string} bgColor - Outer background color for light mode (e.g., "#f9f8f6")
 * @param {string} darkBgColor - Outer background color for dark mode (e.g., "#000000")
 * @param {string} innerBgColor - Inner background color for light mode (e.g., "#ffffff")
 * @param {string} darkInnerBgColor - Inner background color for dark mode (e.g., "#1a1a1a")
 * @param {string} textColor - Text color for light mode (e.g., "#000000")
 * @param {string} darkTextColor - Text color for dark mode (e.g., "#ffffff")
 * @param {string} className - Additional classes to merge with defaults
 */
export const TopicCard = ({
    title,
    description,
    href = "#",
    image,
    imageAlt = "",
    iconUrl,
    iconSize = "20",
    bgColor = "#f9f8f6",
    darkBgColor = "#000000",
    innerBgColor = "#ffffff",
    darkInnerBgColor = "#1a1a1a",
    textColor = "#000000",
    darkTextColor = "#ffffff",
    className = "",
}) => {
    // ===== STATE =====
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        const html = document.documentElement;
        const check = () => setIsDark(html.classList.contains("dark"));
        check();
        const observer = new MutationObserver(check);
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    // ===== RESOLVED COLORS =====
    const resolvedOuterBg = isDark ? darkBgColor : bgColor;
    const resolvedInnerBg = isDark ? darkInnerBgColor : innerBgColor;
    const resolvedText = isDark ? darkTextColor : textColor;
    const resolvedSubText = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";

    // ===== RENDER =====
    return (
        <a
            href={href}
            className={`flex flex-col h-full p-2 rounded-2xl border dark:border-white/10 border-gray-400 no-underline cursor-pointer group relative overflow-visible ${className}`}
            style={{
                backgroundColor: resolvedOuterBg,
                textDecoration: "none",
                color: resolvedText,
                marginTop: image ? "3rem" : "0",
            }}
        >
            {/* Top image — overflows above the outer container */}
            {image && (
                <div
                    className="absolute right-4 flex justify-end pointer-events-none"
                    style={{ top: "-2.5rem" }}
                >
                    <img
                        src={image}
                        alt={imageAlt}
                        className="h-28 w-auto object-contain transition-transform duration-500 ease-out group-hover:translate-y-2 group-hover:-rotate-6"
                    />
                </div>
            )}

            {/* Inner container */}
            <div
                className="flex flex-col flex-1 rounded-xl border dark:border-white/10 border-gray-400 relative z-10 mt-10"
                style={{
                    backgroundColor: resolvedInnerBg,
                }}
            >
                {/* Icon bubble — positioned halfway over the top edge of inner container */}
                {iconUrl && (
                    <div
                        className="absolute left-4 flex items-center justify-center w-10 h-10 rounded-full border dark:border-white/10 border-gray-400 z-20"
                        style={{
                            backgroundColor: resolvedInnerBg,
                            top: "-1.25rem",
                        }}
                    >
                        <img
                            src={iconUrl}
                            alt=""
                            style={{
                                width: `${iconSize}px`,
                                height: `${iconSize}px`,
                                filter: isDark ? "invert(1)" : "none",
                            }}
                        />
                    </div>
                )}

                {/* Content area */}
                <div className="flex flex-col gap-2 p-4 pt-7 flex-1">

                    {/* Title */}
                    {title && (
                        <h3
                            className="text-lg font-bold m-0"
                            style={{ color: resolvedText }}
                        >
                            {title}
                        </h3>
                    )}

                    {/* Description */}
                    {description && (
                        <p
                            className="text-sm leading-relaxed m-0"
                            style={{ color: resolvedSubText }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </a>
    );
};
