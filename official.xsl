<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <xsl:for-each select="//season">

            <table class="bilboard-table">
                <caption class="bilboard-heading">
                    <xsl:value-of select="nameOfSeason"/>
                </caption>
                <tr>
                    <td>Datum</td>
                    <td>Gegner</td>
                    <td>Spielort</td>
                    <td>Anpfiff</td>
                    <td>Treffen SVO</td>
                </tr>

                <xsl:for-each select="game">
                    <tr>
                        <td>
                            <xsl:value-of select="date"/>
                        </td>
                        <td>
                            <xsl:value-of select="opponent"/>
                        </td>
                        <td>
                            <xsl:value-of select="location"/>
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