
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">

        <xsl:for-each select="//season">

            <table class="bilboard-table">
                <caption class="bilboard-heading">
                    <xsl:value-of select="nameOfSeason"/>
                </caption>
                <tr>
                    <td>Wochentag</td>
                    <td>Uhrzeit</td>
                    <td>Ort</td>
                </tr>

                <xsl:for-each select="dayOfTraining">
                    <tr>
                        <td>
                            <xsl:value-of select="dayOfWeek"/>
                        </td>
                        <td>
                            <xsl:value-of select="from"/>-<xsl:value-of
                                select="to"/>
                        </td>
                        <td><xsl:value-of select="location"/></td>
                    </tr>
                </xsl:for-each>
            </table>
        </xsl:for-each>

    </xsl:template>

</xsl:stylesheet>