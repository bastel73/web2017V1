<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>
    <xsl:template match="/">
        <xsl:for-each select="//paragraph">
            <xsl:for-each select="line">
                <p class="headLine">
                    <xsl:value-of select="text()"/>
                </p>
            </xsl:for-each>
            <xsl:for-each select="emphasize">
                <span class="heading-primary-sub-sub">
                    <xsl:value-of select="text()"/>
                </span>
            </xsl:for-each>

            <xsl:for-each select="picture">
                <img>
                    <xsl:attribute name="src">
                        <xsl:value-of select="text()"/>
                    </xsl:attribute>
                </img>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>