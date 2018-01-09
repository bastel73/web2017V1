<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>
    <xsl:template match="/">
        <xsl:for-each select="//tournaments">

            <table class="bilboard-table">
                <caption class="bilboard-heading">
                    <xsl:value-of select="currentSeason"/>
                </caption>
                <tr>
                    <td>Datum</td>
                    <td>Spielort</td>
                    <td>Turnier</td>
                    <td>Anpfiff</td>
                    <td>Treffen SVO</td>
                </tr>

                <xsl:for-each select="event">
                    <tr>
                        <td>
                            <xsl:value-of select="date"/>
                        </td>
                        <td>
                            <xsl:value-of select="location"/>
                        </td>
                        <td>
                            <xsl:value-of select="name"/>
                        </td>
                        <td><xsl:value-of select="kickOff"/></td>
                        <td><xsl:value-of select="meetingTime"/></td>
                    </tr>
                </xsl:for-each>
            </table>
        </xsl:for-each>
        <div id="1" class="modal"></div>
    </xsl:template>

</xsl:stylesheet>