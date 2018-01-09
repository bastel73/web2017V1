<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <xsl:for-each select="//lineup">


            <table class="bilboard-table">
                <caption class="bilboard-heading">
                    <xsl:value-of select="game"/>
                </caption>
                <tr>
                    <td>Position</td>
                    <td>Rückennummer</td>
                    <td>Name</td>
                </tr>

                <xsl:for-each select="player">
                    <tr>
                        <td>
                            <xsl:value-of select="role"/>
                        </td>
                        <td>
                            <xsl:value-of select="backNumber"/>
                        </td>
                        <td>
                            <xsl:value-of select="name"/>
                        </td>

                    </tr>
                </xsl:for-each>
            </table>
            <div class="navItem" onclick="closeModal()">
            <a href="#">
                <i class="fa fa-window-close-o" aria-hidden="true"></i>
            </a>
        </div>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>