
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">

        <xsl:for-each select="//pictures">


                    <div class="galleryWrapper">
                        <xsl:for-each select="picItem">
                            <div class="picItem" onclick="showModal()">
                        <img class="thumb" alt="Smiley face">
                            <xsl:attribute name="id">
                                <xsl:value-of select="position()"/>
                            </xsl:attribute>
                            <xsl:attribute name="src">
                                <xsl:value-of select="text()"/>
                            </xsl:attribute>
                        </img>
                            </div>
                            <div class="modal">
                                <img onclick="closeModal()">
                                    <xsl:attribute name="src">
                                        <xsl:value-of select="text()"/>
                                    </xsl:attribute>
                                </img>
                                <div class="navItem" onclick="closeModal()">
                                    <a href="#">
                                        <i class="fa fa-window-close-o" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </xsl:for-each>
                    </div>


        </xsl:for-each>

    </xsl:template>

</xsl:stylesheet>